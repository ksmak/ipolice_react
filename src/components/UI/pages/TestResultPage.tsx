import { useParams } from "react-router";
import LanguagePanel from "../panels/LanguagePanel";
import NavigatorPanel from "../panels/NavigatorPanel";
import TestResultView from "../views/TestResultView";

const TestResultPage = () => {
    const { testId } = useParams();
    return (
        <div>
            <NavigatorPanel />
            <TestResultView testId={testId} />
        </div>
    )
}

export default TestResultPage;