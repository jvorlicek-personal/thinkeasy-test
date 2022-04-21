// base and 3rd party
import React from 'react';
import {
	useState,
	useEffect,
} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

// api, styling, helpers
// TODO: something about path so i can do (src/assets/styles/App.css)
import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

// components and types
import { question, answer } from './types';

// Note self: pointless ?
const INIT_QUESTION = 1;

interface Props {
	questionData: question[],
}

export const Questionnaire = ({ questionData }: Props) => {
	//other
	//state
	const [answerVal, setAnswerVal] = useState<string>('');
	const [answerList, setAnswerList] = useState<answer[]>([]);
	const [currentStep, setCurrentStep] = useState<number>(INIT_QUESTION);
	const [currentQuestionId, setCurrentStepId] = useState<number>(NaN);
	const [questionnaireFinished, setQuestionnaireFinished] = useState<boolean>(false);

	// const [disabledNext, setDisabledNext] = useState<boolean>(true);

	useEffect(() => {
		//Note: success only as reaction to finish
		if (questionnaireFinished) {
			toast.success('Questionnaire finished!',)
		}
	}, [questionnaireFinished])

	const handleQuestion = (type: number) => {
		// Note: 1 === prev, 2 === next
		// Note: handling of answer list (history + new addition)
		// Note self: using state history instead ? would be better solution i guess, dont want to change it now (original idea had a popup for history changes and this felt a bit better for that)
		if ((type === 1) && (currentStep !== 1)) {
			setQuestionnaireFinished(false);
			setAnswerVal(answerList[currentStep - 2].answer)
			setCurrentStep(currentStep - 1);
		} else if ((type === 2) && (currentStep !== questionData.length)) {
			setQuestionnaireFinished(false);
			updateAnswerList();
			if (answerList.find((element) => {
				return element.questionId === currentQuestionId + 1;
			})) {
				setAnswerVal(answerList[(currentQuestionId)].answer)
			} else {
				setAnswerVal('');
			}
			setCurrentStep(currentStep + 1);

		} else {
			// final step as last question ? making it a bit easier
			setCurrentStep(currentStep + 1);
			updateAnswerList();
			setQuestionnaireFinished(true);
		}
	}

	const updateAnswerList = () => {
		// better solution for sorting after mutation ? 
		setAnswerList([...answerList.filter(answer => answer.questionId !== currentQuestionId), {
			questionId: currentQuestionId, answer: answerVal, position: currentStep,
		}].sort((a, b) => (a.position > b.position) ? 1 : -1))
	}

	const showQuestion = () => {
		const question = questionData.sort((a, b) => (a.position > b.position) ? 1 : -1).filter((question, index) => (index + 1) === currentStep).map(question => {
			if (currentQuestionId !== question.id) {
				setCurrentStepId(question.id);
			}
			return `${question.id}. ${question.question}`
		});

		return question;
	}

	const parseAnswers = () => {
		const content = answerList.map((answer, index) => {
			return (
				<p key={`answer_${index}`}>
					{answer.answer}&nbsp;
				</p>
			);
		})

		return content
	}

	return (
		<div className='App'>
			<Grid container spacing={2}>
				<Grid item xs={1}>
					{
						currentStep !== 1 &&
						<Button
							onClick={() => handleQuestion(1)}
							variant="outlined"
						>{
								questionnaireFinished ?
									'Change answers' :
									'Prev'
							}</Button>
					}
				</Grid>
				<Grid item xs={10}>
					{
						!questionnaireFinished ?
							<TextField
								id="outlined-required"
								label={showQuestion()}
								value={answerVal}
								onChange={(e) => setAnswerVal(e.target.value)}
							/> :

							<div className='full-answer'>
								{parseAnswers()}
							</div>
					}
				</Grid>
				<Grid item xs={1}>
					{
						currentStep !== questionData.length + 1 &&
						<Button
							disabled={answerVal ? false : true}
							onClick={() => handleQuestion(2)}
							variant="outlined"
						>
							{
								(currentStep === questionData.length) ?
									'Finish' :
									'Next'
							}
						</Button>
					}
				</Grid>
			</Grid>
		</div>
	);
}