## PROYECTO INTRO APLICACION WEB GEOGRAFIA 
### AUTOR :lino augusto joven galindo 



from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Animal(db.Model):
    __tablename__ = 'animal'

    id = db.Column(db.Integer, primary_key=True)
    animal = db.Column(db.String(100), nullable=False)
    especie = db.Column('especie ', db.String(100), nullable=False)  # Nota: hay un espacio en el nombre de columna
    dieta = db.Column(db.String(100), nullable=False)
    habitat_o_distribucion = db.Column('habitat_o_distribucion ', db.String(150), nullable=False)  # También tiene espacio
    grupo = db.Column(db.String(100), nullable=False)
    cantidad_afectada = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<Animal {self.animal}, Especie: {self.especie}>"
