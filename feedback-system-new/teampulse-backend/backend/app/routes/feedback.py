from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/feedback/", response_model=schemas.FeedbackOut)
def create_feedback(feedback: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    fb = models.Feedback(**feedback.dict())
    db.add(fb)
    db.commit()
    db.refresh(fb)
    return fb

@router.get("/employee/{employee_id}/feedbacks", response_model=list[schemas.FeedbackOut])
def get_feedbacks(employee_id: int, db: Session = Depends(get_db)):
    return db.query(models.Feedback).filter(models.Feedback.employee_id == employee_id).all()

@router.put("/feedback/{feedback_id}/acknowledge")
def acknowledge_feedback(feedback_id: int, db: Session = Depends(get_db)):
    fb = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if not fb:
        raise HTTPException(status_code=404, detail="Feedback not found")
    fb.acknowledged = 1
    db.commit()
    return {"message": "Acknowledged"}
