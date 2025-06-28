from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app import models, schemas, crud
from app.database import SessionLocal, engine

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for dev frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Register a new user
@app.post("/register/")
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

# Submit feedback
@app.post("/feedback/", response_model=schemas.FeedbackOut)
def submit_feedback(feedback: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    return crud.create_feedback(db=db, feedback=feedback)

# Get feedbacks given by a manager
@app.get("/manager/{manager_id}/team_feedbacks", response_model=list[schemas.FeedbackOut])
def get_manager_feedbacks(manager_id: int, db: Session = Depends(get_db)):
    return crud.get_feedback_for_manager(db=db, manager_id=manager_id)

# ✅ Get feedbacks received by an employee
@app.get("/employee/{employee_id}/feedbacks", response_model=list[schemas.FeedbackOut])
def get_employee_feedbacks(employee_id: int, db: Session = Depends(get_db)):
    return crud.get_feedback_for_employee(db=db, employee_id=employee_id)

# Acknowledge feedback
@app.put("/feedback/{feedback_id}/acknowledge")
def acknowledge_feedback(feedback_id: int, db: Session = Depends(get_db)):
    return crud.acknowledge_feedback(db=db, feedback_id=feedback_id)



from fastapi import HTTPException  # make sure this is imported

# ✅ Get a user by ID (for login validation)
@app.get("/user/{user_id}", response_model=schemas.User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
