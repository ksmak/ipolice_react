import { Button, Card, CardBody, CardFooter, Dialog, Input, Spinner, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useState } from "react";
import { supabase } from "../../../api/supabase";
import { Provider } from "@supabase/supabase-js";

type LoginViewProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function LoginView({ open, setOpen }: LoginViewProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorLogin, setErrorLogin] = useState<string>('');
    const [errorRegister, setErrorRegister] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignUp = async () => {
        if (password.length < 6) {
            setErrorRegister(t('errorPasswordLen'));
            return;
        }
        if (password !== confirmPassword) {
            setErrorRegister(t('errorPasswordConfirm'));
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        setLoading(false);
        if (error) {
            setErrorRegister(t('errorSignUp'));
            return;
        }
        navigate('/register_success');
    }

    const handleEmailLogin = async () => {
        setErrorLogin('');
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        setLoading(false);
        if (error) {
            setErrorLogin(t('errorLogin'));
        } else {
            navigate(-1);
        }
    }

    const handleProviderLogin = async (provider: Provider) => {
        setLoading(true);
        await supabase.auth.signInWithOAuth({
            provider: provider,
        })
        setLoading(false);
    }

    const handleOpen = () => setOpen(!open);

    return (
        <Dialog
            className="bg-transparent shadow-none"
            open={open}
            handler={handleOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
            size="xs"
        >
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardBody className="">
                    <Tabs value='enter'>
                        <TabsHeader>
                            <Tab key={0} value='enter' className="capitalize">
                                {t('enter')}
                            </Tab>
                            <Tab key={1} value='register' className="capitalize">
                                {t('register')}
                            </Tab>
                        </TabsHeader>
                        <TabsBody
                            animate={{
                                initial: { x: 250 },
                                mount: { x: 0 },
                                unmount: { x: 250 },
                            }}

                        >
                            <TabPanel className="p-0" key={0} value='enter'>
                                <div className="flex flex-col w-full">
                                    <div className="mb-5 text-red-600">
                                        {errorLogin}
                                    </div>
                                    <div className="mb-5">
                                        <Input
                                            type="email"
                                            name="email"
                                            value={email}
                                            label={t('email')}
                                            crossOrigin=""
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <Input
                                            type="password"
                                            name="password"
                                            value={password}
                                            label={t('password')}
                                            crossOrigin=""
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-5 text-center">
                                        <a className="text-sm text-primary-500" href="/reset_password">{t('forgetPassword')}</a>
                                    </div>
                                    <div className="self-center">
                                        <Button
                                            className="bg-primary-500"
                                            onClick={handleEmailLogin}
                                        >
                                            {t('enter')}
                                        </Button>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="p-0" key={1} value='register'>
                                <div className="flex flex-col w-full">
                                    <div className="mb-5 text-red-600">
                                        {errorRegister}
                                    </div>
                                    <div className="mb-5">
                                        <Input
                                            type="email"
                                            name="email"
                                            value={email}
                                            label={t('email')}
                                            crossOrigin=""
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <Input
                                            type="password"
                                            name="password"
                                            value={password}
                                            label={t('password')}
                                            crossOrigin=""
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <Input
                                            type="password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            label={t('repeatPassword')}
                                            crossOrigin=""
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="self-center">
                                        <Button
                                            className="bg-primary-500"
                                            onClick={handleSignUp}
                                        >
                                            {t('register')}
                                        </Button>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                    <CardFooter className="p-0 mt-4">
                        <div className="flex flex-col w-full">
                            <Typography className="mb-5 self-center">
                                {t('OR')}
                            </Typography>
                            <Button
                                size="lg"
                                variant="outlined"
                                color="blue-gray"
                                className="flex justify-center items-center gap-3 mb-4 hover:bg-primary-500 hover:border-white hover:text-white"
                                onClick={() => handleProviderLogin('google')}
                            >
                                <img src="/icons/google.png" alt="google" className="h-6 w-6" />
                                {t('continue_google')}
                            </Button>
                        </div>
                    </CardFooter>
                </CardBody>
            </Card>
            {loading
                ? <Spinner
                    className="w-24 h-24 text-primary-500 text-center block fixed z-[9999] top-[calc(50%-10rem)] left-[calc(50%-6rem) rounded-lg"
                />
                : null
            }
        </Dialog>
    )
};