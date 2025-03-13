import { Button } from '@/components/ui/button';
import ErrorFeedback from '@/components/ui/error-feedback';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'sonner';

export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, post, errors, reset, processing } = useForm({
        _method: 'PUT',
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('user-password.update'), {
            errorBag: 'updatePassword',
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Password updated successfully');
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className="flex flex-col gap-6">
            <header className="flex flex-col gap-2">
                <h2 className="text-lg font-medium">Update Password</h2>

                <p className="text-muted-foreground text-sm">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="current_password">Current Password</Label>

                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="max-w-lg"
                        autoComplete="current-password"
                    />

                    {errors.current_password && (
                        <ErrorFeedback message={errors.current_password} />
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">New Password</Label>

                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="max-w-lg"
                        autoComplete="new-password"
                    />

                    {errors.password && (
                        <ErrorFeedback message={errors.password} />
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>

                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="max-w-lg"
                        autoComplete="new-password"
                    />

                    {errors.password_confirmation && (
                        <ErrorFeedback message={errors.password_confirmation} />
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>
                </div>
            </form>
        </section>
    );
}
