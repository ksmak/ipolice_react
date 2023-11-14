import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Typography } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../elements/Logo";
import LanguagePanel from "../panels/LanguagePanel";

type FirstViewProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function FirstView({ open, setOpen }: FirstViewProps) {
    const { t } = useTranslation();
    const handleOpen = () => setOpen(!open);

    return (
        <Dialog
            open={open}
            handler={handleOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
            size="lg"
        >
            <DialogHeader className="justify-between bg-blue-gray-50 rounded-md">
                <Typography
                    variant="h4"
                    color="blue"
                >
                    {t('announcementTitle')}
                    <br />
                </Typography>
                <div className="flex flex-row gap-4">
                    <LanguagePanel />
                    <IconButton
                        color="blue"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
            </DialogHeader>
            <DialogBody className="h-[42rem] overflow-y-scroll flex flex-col">
                <div className="h-16 w-48 self-center mb-4">
                    <Logo />
                </div>
                <Typography
                    className="font-normal"
                    variant="paragraph"
                >
                    {t('announcementContent1')}
                    <br /> <br />
                    {t('announcementContent2')}
                    <br /> <br />
                    {t('announcementContent3')}
                    <br /> <br />
                    {t('announcementContent4')}
                    <br /> <br />
                    {t('announcementContent5')}
                    <br /> <br />
                    {t('announcementContent6')}
                    <br /> <br />
                    {t('announcementContent7')}
                    <br /> <br />
                    {t('announcementContent8')}
                    <br /> <br />
                    {t('announcementContent9')}
                    <br /> <br />
                </Typography>
            </DialogBody>
            <DialogFooter
                className="flex flex-row justify-center"
            >
                <Button
                    variant="gradient"
                    color="blue"
                    onClick={handleOpen}
                >
                    <span>{t('close')}</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}