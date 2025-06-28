from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)  # 'manager' or 'employee'
    manager_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    team = relationship("User", remote_side=[id])
    
    # Relationships
    feedbacks_received = relationship("Feedback", foreign_keys='Feedback.employee_id', back_populates="employee")
    feedbacks_given = relationship("Feedback", foreign_keys='Feedback.manager_id', back_populates="manager")


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    strengths = Column(Text)
    improvements = Column(Text)
    sentiment = Column(String)  # positive/neutral/negative
    created_at = Column(DateTime, default=datetime.utcnow)
    acknowledged = Column(Integer, default=0)

    employee_id = Column(Integer, ForeignKey("users.id"))
    manager_id = Column(Integer, ForeignKey("users.id"))

    employee = relationship("User", foreign_keys=[employee_id], back_populates="feedbacks_received")
    manager = relationship("User", foreign_keys=[manager_id], back_populates="feedbacks_given")
