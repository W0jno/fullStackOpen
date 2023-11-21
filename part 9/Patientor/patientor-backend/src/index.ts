import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses'
import patientRouter from './routes/patients'
const app = express();
app.use(express.json());
app.use(cors());
//ROUTES
app.use('/api/diagnoses', diagnoseRouter)
app.use('/api/patients', patientRouter)


//SERVER CONFIGURATION  
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});