# Fases del Projecte Final MERN 

Aquest projecte es planteja com un **desenvolupament progressiu per fases**, on:

- Trieu la temàtica.
- Definiu el model de dades.
- Construïu primer una base funcional.
- Refactoritzeu i milloreu l'arquitectura al final.

Pes aproximat del treball:
- **Backend → 40% del temps**
- **Frontend (React + TS) → 60% del temps**

L'objectiu NO és fer una arquitectura perfecta des del minut 1, sinó construir, entendre i després millorar.

---

#  Treball individual

# FASE 1 — Disseny 

## 1️⃣ Elecció de temàtica

 - Una aplicacio per consultar Personatges del manga/serie Hellsing.

## 2️⃣ Definició del model
L'entitat principal ha de tenir obligatòriament:

- String
- Number
- Boolean
- Date
- Array

- Per què aquests camps?
  - String -> Nom del perosnatge.
  - Number -> numero id alternatiu.
  - Boolean -> Si el personatge acaba mort al final de la serie: true/false
  - Date -> Data de naixement del personatge.
  - Array ->  Llista de sobrenoms del personatge.

- Quines validacions tindran els camps

  - Camp Nom:
    - String  
    - Obligatori
    - minim 3 lletres
  - Camp Numero:
    - Number  
    
  - Camp Es mort (boolean):
    - No calen validacions? 
  - Camp data naixmement:
    - Date
  - Camp Sobrenoms:
    - Array
---

#  FASE 2 — Backend funcional 

Partint del backend de referència treballat a classe (notes-api):

## Requisits mínims

- CRUD complet
- Validacions amb Mongoose
- Gestió d'errors bàsica
- Estructura semblant a la donada a classe

Objectiu: API operativa i estable.

---

# FASE 3 — Frontend React + TypeScript

Aquí és on posem més pes.

## Requisits tècnics

- React amb TypeScript
- Components modulars
- Carpeta de serveis per a API


## Components mínims

- Llista d'elements
- Formulari de creació
- Formulari d'edició
- Component detall
- Component reutilitzable (Button, Card, Badge, etc.)

## Validacions frontend

- Validació abans d'enviar
- Missatges d'error clars
- No confiar només en el backend

---

