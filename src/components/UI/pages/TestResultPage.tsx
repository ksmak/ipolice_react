import { useParams } from "react-router";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import TestResultView from "../views/TestResultView";

const TestResultPage = () => {
    const { testId } = useParams();
    return (
        <div className="container mx-auto p-4">
            <div className="h-fit bg-blue-gray-50 grid p-4 gap-4">
                <div className="col-span-4 justify-self-end">
                    <LanguagePanel />
                </div>
                <div className="col-span-4 self-center">
                    <NavigatorPanel />
                </div>
            </div>
            <TestResultView testId={testId} />
        </div>
    )
}

export default TestResultPage;