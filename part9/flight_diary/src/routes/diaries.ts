import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (diary !== undefined) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  const newDiaryEntry = diaryService.addDiary(toNewDiaryEntry(req.body));
  res.json(newDiaryEntry);
});

export default router;
