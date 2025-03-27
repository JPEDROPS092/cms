from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware

import models
import schemas
from database import engine, get_db

# Create tables in the database
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="CMS API", description="API Simples com FastAPI e SQLAlchemy")

# Configure CORS - permitir todas as origens para resolver problemas de preflight OPTIONS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas as origens
    allow_credentials=False,  # Deve ser False quando allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Bem-vindo ao Sistema de Gerenciamento de Conteúdo (CMS)"}

# Create post endpoint
@app.post("/posts", status_code=status.HTTP_201_CREATED, response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    new_post = models.Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

# Get todos os posts endpoint
@app.get("/posts", response_model=List[schemas.Post])
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    return posts

# Get post por ID endpoint
@app.get("/posts/{post_id}", response_model=schemas.Post)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post com id: {post_id} não encontrado")
    return post

# Update post endpoint
@app.put("/posts/{post_id}", response_model=schemas.Post)
def update_post(post_id: int, updated_post: schemas.PostUpdate, db: Session = Depends(get_db)):
    post_query = db.query(models.Post).filter(models.Post.id == post_id)
    post = post_query.first()
    
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post com id: {post_id} não encontrado")
    
    # Only update campos que foram fornecidos
    update_data = {k: v for k, v in updated_post.dict().items() if v is not None}
    post_query.update(update_data, synchronize_session=False)
    
    db.commit()
    db.refresh(post)
    return post

# Delete post endpoint
@app.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == post_id)
    
    if post.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Post com id: {post_id} não encontrado")
    
    post.delete(synchronize_session=False)
    db.commit()
    return None
