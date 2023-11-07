import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import { useParams } from "react-router";
import TestForm from "../forms/TestForm";
import TestView from "../views/TestView";

interface TestPageProps {
    isEdit: boolean
}
const TestPage = ({ isEdit }: TestPageProps) => {
    const { testId } = useParams();
    return (
        <div>
            <div className="h-fit bg-blue-400 grid p-4 gap-4">
                <div className="col-span-4 justify-self-end">
                    <LanguagePanel />
                </div>
                <div className="col-span-4 self-center">
                    <NavigatorPanel />
                </div>
            </div>
            {isEdit
                ? <TestForm testId={testId} />
                : <TestView testId={testId} />}
        </div>
    )
}

export default TestPage;