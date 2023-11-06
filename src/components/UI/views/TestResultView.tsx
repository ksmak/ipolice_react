import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { TestDataRow, TestResults, TestType, UserRole } from "../../../types/types";
import { supabase } from "../../../api/supabase";
import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Title,
    Tooltip
} from 'chart.js';
import { Alert, Button } from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";
import Loading from "../elements/Loading";
import { AuthContext } from "../../../App";

interface TestResultViewProps {
    testId: string | undefined
}

const TestResultView = ({ testId }: TestResultViewProps) => {
    const { session, roles } = useContext(AuthContext);
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
    const [testResults, setTestResults] = useState<TestResults[]>([]);
    const [testData, setTestData] = useState<TestDataRow[]>([]);

    useEffect(() => {
        if (testId) {
            getTest(testId);
            getResults(testId);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (test && testResults) {
            calcTestResults();
        }
    }, [test, testResults])

    const getTest = async (testId: string) => {
        const { data } = await supabase
            .from('tests')
            .select()
            .eq('id', testId)
            .single();
        if (data) {
            const prundedData = data as TestType;
            setTest(prundedData);
        }
    }

    const getResults = async (testId: string) => {
        const { data } = await supabase
            .from('test_results')
            .select()
            .eq('test_id', testId);
        if (data) {
            const prundedData = data as TestResults[];
            setTestResults(prundedData);
        }
    }

    const title = String(test[`title_${i18n.language}` as keyof typeof test]);
    const participants = `${t('participantCount')}: ${testResults.length}`;

    const calcTestResults = () => {
        let arr: TestDataRow[] = [];
        test.data?.questions?.forEach((q, index) => {
            const title = String(q[`title_${i18n.language}` as keyof typeof q]);
            const labels = q.answers ? q.answers.map(a => String(a[`title_${i18n.language}` as keyof typeof a])) : [];
            const res = new Array(q.answers?.length).fill(0);
            let own_answers: string[] = [];
            testResults.forEach(tr => {
                tr.data?.results.forEach(t => {
                    if (t.question === String(index + 1)) {
                        t.answers.forEach((r, i) => {
                            if (r) {
                                res[i]++;
                            }
                        });
                        if (t.own_answer) {
                            if (!(t.own_answer in own_answers)) {
                                own_answers.push(t.own_answer);
                            }
                        }
                    }
                })
            });
            const row: TestDataRow = {
                title: title,
                labels: labels,
                data: res,
                own_answers: own_answers
            };
            arr.push(row);
        });
        setTestData(arr);
    }

    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    console.log(testData);

    return (
        <div className="mt-4 flex flex-col">
            {UserRole.admin in roles || (UserRole.test_edit in roles && session?.user.id === test?.user_id)
                ? <div>
                    <div className="flex flex-row justify-end py-4 pr-5">
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
                    {test && testResults.length > 0
                        ? <div>
                            <div className="text-2xl font-bold text-teal-600 self-center">{title}</div>
                            <div className="mt-4 text-teal-600">{participants}</div>
                            {testData.map((d, i) => {
                                const data = {
                                    labels: d.labels,
                                    datasets: [{
                                        label: d.title,
                                        data: d.data,
                                        backgroundColor: [
                                            'rgb(153, 102, 255)'
                                        ],
                                        borderColor: [
                                            'rgb(153, 102, 255)'
                                        ],
                                        borderWidth: 1
                                    }]
                                };
                                return (
                                    <div>
                                        <div className="text-teal-600 mt-5">{i + 1}. {d.title}</div>
                                        <Bar data={data} />
                                        {d.own_answers.length > 0
                                            ? <ul className="text-teal-600">{t('ownAnsers')}:
                                                {d.own_answers.map((a, i) => <li key={i} className="text-blue-gray-800">{a}</li>)}
                                            </ul>
                                            : null}
                                    </div>
                                );
                            })}
                        </div>
                        : <Loading />}

                </div>
                : <Alert className="bg-red-500 my-4">{t('errorAccess')}</Alert>
            }
        </div>
    )
}


export default TestResultView;