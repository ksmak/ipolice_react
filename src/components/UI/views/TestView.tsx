import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ResultTest, TestType, UserRole } from "../../../types/types";
import { supabase } from "../../../api/supabase";
import Loading from "../elements/Loading";
import { Alert, Button } from "@material-tailwind/react";

interface TestViewProps {
    testId: string | undefined
}

const TestView = ({ testId }: TestViewProps) => {
    const { session, role } = useContext(AuthContext);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [test, setTest] = useState<TestType>({
        id: null,
        title_ru: null,
        title_kk: null,
        title_en: null,
        data: null,
        user_id: null,
    } as TestType);
    const [results, setResults] = useState<ResultTest[]>([]);
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (testId) {
            getTest(testId);
        }
        // eslint-disable-next-line
    }, []);

    const getTest = async (testId: string) => {
        const { data } = await supabase
            .from('tests')
            .select()
            .eq('id', testId)
            .single();
        if (data) {
            const prundedData = data as TestType;
            setTest(prundedData);
            if (prundedData.data?.questions) {
                const newResults: ResultTest[] = prundedData.data.questions.map((q, i) => {
                    return ({
                        question: String(i + 1),
                        answers: q.answers ? new Array(q.answers.length).fill(false) : [],
                    })
                });
                setResults(newResults);
            }
        }
    }

    const title = String(test[`title_${i18n.language}` as keyof typeof test]);

    const handleSaveTest = async () => {
        setError('');
        setOpenError(false);
        // check
        for (let i = 0; i < results.length; i++) {
            const checker = results[i].answers.every(a => a === false);
            if (checker && !results[i].own_answer) {
                setError(t('errorCompleteTest'));
                setOpenError(true);
                return;
            }
        }
        const { error } = await supabase
            .from('test_results')
            .insert({
                test_id: test.id,
                data: { results: results }
            });
        if (error) {
            setError(error.message);
            setOpenError(true);
            return;
        }
        navigate('/test_success');
    }

    return (
        <div className="w-full bg-blue-gray-50 mt-5 p-5 rounded-md" >
            <div className="flex flex-row justify-end py-4 pr-5">
                {role === UserRole.admin || role === UserRole.editor || (role === UserRole.operator && session?.user.id === test?.user_id)
                    ? <Button
                        className="bg-teal-600 mr-3"
                        size="sm"
                        onClick={() => navigate(`/test_result/${test.id}`)}
                    >
                        {t('results')}
                    </Button>
                    : null}
                {role === UserRole.admin || role === UserRole.editor || (role === UserRole.operator && session?.user.id === test?.user_id)
                    ? <Button
                        className="bg-teal-600 mr-3"
                        size="sm"
                        onClick={() => navigate(`/tests/edit/${test.id}`)}
                    >
                        {t('edit')}
                    </Button>
                    : null}
                <Button
                    className=""
                    size="sm"
                    variant="outlined"
                    color="teal"
                    onClick={() => navigate(-1)}
                >
                    {t('close')}
                </Button>
            </div>
            {test.id && results.length > 0 ? <div className="flex flex-col">
                <div className="text-2xl font-bold text-teal-600 self-center">
                    {title}
                </div>
                {test.data?.questions
                    ? test.data.questions.map((question, questionIndex) => {
                        const questionVal = String(questionIndex + 1);
                        const questionTitle = `${questionIndex + 1}. ${String(question[`title_${i18n.language}` as keyof typeof question])}`;
                        const inputType = question.multyple ? 'checkbox' : 'radio';
                        const handleOnChangeOwnAnswer = (e: ChangeEvent<HTMLInputElement>) => {
                            const nextResults = results.map(r => {
                                if (r.question === questionVal) {
                                    return {
                                        question: r.question,
                                        answers: r.answers,
                                        own_answer: e.target.value
                                    };
                                } else {
                                    return r;
                                }
                            })
                            setResults(nextResults);
                        }
                        const answerElements = question.answers ? question.answers.map((a, answerIndex) => {
                            const answerTitle = String(a[`title_${i18n.language}` as keyof typeof a]);
                            const id = `id_${questionIndex}_${answerIndex}`;
                            const handleOnChange = (position: number) => {
                                const nextResults = results.map(r => {
                                    if (r.question === questionVal) {
                                        if (inputType === 'checkbox') {
                                            const nextAnswers = r.answers ? r.answers.map((a, i) => i === position ? !a : a) : [];
                                            return {
                                                question: r.question,
                                                answers: nextAnswers,
                                            }
                                        } else {
                                            const nextAnswers = r.answers ? r.answers.map((a, i) => i === position ? true : false) : [];
                                            return {
                                                question: r.question,
                                                answers: nextAnswers,
                                            }
                                        }
                                    } else {
                                        return r;
                                    }
                                })
                                setResults(nextResults);
                            }

                            return (
                                <div className="text-blue-gray-900" key={answerIndex}>
                                    <input
                                        id={id}
                                        type={inputType}
                                        onChange={() => handleOnChange(answerIndex)}
                                        checked={
                                            results.length >= 0
                                            && results[questionIndex].answers
                                            && results[questionIndex].answers.length >= 0
                                            && results[questionIndex].answers[answerIndex]}
                                    />
                                    <label htmlFor={id} className="mx-2">{answerTitle}</label>
                                </div>
                            )
                        }) : null;
                        return (
                            <div className="text-blue-gray-900" key={questionIndex}>
                                <div className="text-md font-sans  mt-4">
                                    {questionTitle}
                                </div>
                                {answerElements}
                                {question.own_answer
                                    ? <div>
                                        <label htmlFor={`own_answer_${questionIndex}`} className="mx-2">{t('ownAnswer')}</label>
                                        <input id={`own_answer_${questionIndex}`} type="text" onChange={handleOnChangeOwnAnswer} />
                                    </div>
                                    : null
                                }
                            </div>
                        )
                    })
                    : null
                }
                <Alert className="bg-red-500" open={openError} onClose={() => setOpenError(false)}>{error ? error : t('error')}</Alert>
                <div className="flex flex-row justify-center py-4 pr-5">
                    <Button
                        className="bg-teal-600 mr-3"
                        size="md"
                        onClick={() => handleSaveTest()}
                    >
                        {t('complete')}
                    </Button>
                </div>
            </div>
                : <Loading />}
        </div>
    )
}

export default TestView;