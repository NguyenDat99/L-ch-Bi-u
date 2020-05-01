import express from 'express';
import SubjectController from '../modules/subjects/controller/subject.controller';
import SubjectValidate from '../modules/subjects/middleware/subject.middleware';
//
const router = express.Router();
//
// POST
router.post('/subject/', SubjectValidate.createSubjectInput, SubjectController.createSubject);
//
//PUT
router.put('/subject/:subject_id', SubjectValidate.updateSubjectInput, SubjectController.updateSubject);
//
//GET
router.get('/subject/', SubjectValidate.getAllSubjectInput, SubjectController.getAllSubjects);
router.get('/subject/:subject_id', SubjectValidate.getSubjectInput, SubjectController.getSubject);
// DELETE
router.delete('/subject/:subject_id', SubjectValidate.blockSubjectInput, SubjectController.blockSubject);
export default router;
