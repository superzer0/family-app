export interface Answer {
  answer: string;
  score: number;
  state?: boolean;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export interface Family {
  name: string;
  score?: number;
  wrongAnswers?: number;
}

export interface Participants {
  family1: Family;
  family2: Family;
}

export const PARTICIPANTS: Participants = {
  family1: {
    name: 'Zbieciowie'
  },
  family2: {
    name: 'Cieslakowie'
  }
};

export const QUESTIONS: Question[] = [
  {	
    question: 'Więcej niż jedno zwierze:', 
    answers: [
      {answer : 'lama', score:34},
      {answer : 'stado', score:27},
      {answer : 'wataha', score:19},
      {answer : 'owca', score:14},
      {answer : 'klucz', score:6},
    ]
  },
  {	
    question: 'Największe państwo pod względem powierzchni to:', 
    answers: [
      {answer : 'Rosja', score:35},
      {answer : 'Kanada', score:25},
      {answer : 'Chiny', score:20},
      {answer : 'USA', score:15},
      {answer : 'Radom', score:5}
    ]
  },
  {	
    question: 'Co może być weselne:', 
    answers: [
      {answer : 'wodka', score:38},
      {answer : 'klimat', score:32},
      {answer : 'tort', score:18},
      {answer : 'sala', score:12}
    ]
  },
  {	
    question: 'Jakie znasz drapieżne zwierze?', 
    answers: [
      {answer : 'Tygrys', score:48},
      {answer : 'Lew', score:37},
      {answer : 'Wunsz', score:15}
    ]
  },
  {	
    question: 'Co kojarzy Ci się z wizyta u babci?', 
    answers: [
      {answer : 'Zjedz cos/Czy jestes glodny?', score:44},
      {answer : 'Slodycze', score:38},
      {answer : 'Wakacje ', score:18}
    ]
  }
];