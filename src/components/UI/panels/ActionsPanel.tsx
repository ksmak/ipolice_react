import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Typography,
} from "@material-tailwind/react";
import { Action, UserRole } from "../../../types/types";
import { AiOutlinePlus } from 'react-icons/ai';
import { useContext } from "react";
import { AuthContext } from "../../../App";

interface ActionsPanelProps {
    actions: Action[]
}

const ActionsPanel = ({ actions }: ActionsPanelProps) => {
    const { roles } = useContext(AuthContext);

    return (
        <div className="text-end sticky bottom-10 mr-10">
            <SpeedDial placement="top">
                <SpeedDialHandler>
                    <IconButton size="lg" className="rounded-full" color="teal">
                        <AiOutlinePlus />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    {actions.map((action, index) => (
                        UserRole.admin in roles || action.role in roles
                            ? <SpeedDialAction key={index} onClick={action.onclick}>
                                {action.icon}
                                <Typography
                                    className="absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal"
                                    variant="small"
                                    color="blue-gray"
                                >
                                    {action.label}
                                </Typography>
                            </SpeedDialAction>
                            : null)
                    )}
                </SpeedDialContent>
            </SpeedDial>
        </div>
    );
}

export default ActionsPanel;