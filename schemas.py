from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Base schema with common attributes
class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True

# Schema for creating a post
class PostCreate(PostBase):
    pass

# Schema for updating a post
class PostUpdate(PostBase):
    title: Optional[str] = None
    content: Optional[str] = None
    published: Optional[bool] = None

# Schema for response with all post details
class Post(PostBase):
    id: int
    created_at: datetime
    
    class Config:
        orm_mode = True
