from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# ---------------------- Feedback Schemas ----------------------

class FeedbackBase(BaseModel):
    strengths: str
    improvements: str
    sentiment: str  # positive/neutral/negative

class FeedbackCreate(FeedbackBase):
    employee_id: int
    manager_id: int

class FeedbackOut(FeedbackBase):
    id: int
    acknowledged: int
    created_at: datetime

    class Config:
        orm_mode = True

# ---------------------- User Schemas ----------------------

class UserCreate(BaseModel):
    name: str
    role: str  # 'manager' or 'employee'
    manager_id: Optional[int] = None
    
class User(BaseModel):
    id: int
    name: str
    role: str
    manager_id: Optional[int] = None

    class Config:
        orm_mode = True
