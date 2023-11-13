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
            <NavigatorPanel />
            {isEdit
                ? <TestForm testId={testId} />
                : <TestView testId={testId} />}
        </div>
    )
}

export default TestPage;