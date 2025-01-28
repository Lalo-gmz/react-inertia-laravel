import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    // State
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Refs
    const photoInput = useRef<HTMLInputElement>(null);

    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing } = useForm({
        _method: 'PATCH',
        name: user.name,
        email: user.email,
        photo: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        updateProfileInformation();
    };

    const updateProfileInformation = () => {
        if (photoInput.current?.files?.[0]) {
            data.photo = photoInput.current.files[0];
        }

        post(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Profile updated successfully');
                clearPhotoFileInput();
            },
            onError: (errors) => {
                toast.error('Something went wrong', errors);
            },
        });
    };

    const selectNewPhoto = () => {
        photoInput.current!.click();
    };

    const updatePhotoPreview = () => {
        const photo = photoInput.current!.files![0];

        if (!photo) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            setPhotoPreview(e.target?.result as string | null);
        };

        reader.readAsDataURL(photo);
    };

    const clearPhotoFileInput = () => {
        if (photoInput.current?.value) {
            photoInput.current.value = '';
        }
    };

    return (
        <section className={className}>
            <header className="flex flex-col gap-2">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="col-span-6 sm:col-span-4">
                    {/* Hidden file input for photo upload */}
                    <input
                        id="photo"
                        ref={photoInput}
                        name="photo"
                        type="file"
                        className="hidden"
                        onChange={updatePhotoPreview}
                        accept="image/*"
                    />

                    {/* Profile Photo Preview */}
                    <div className="mt-2 flex items-center gap-4">
                        <div className="group relative">
                            <Avatar className="h-20 w-20 rounded-lg">
                                <AvatarImage
                                    src={photoPreview || user.profile_photo_url}
                                    alt={`${user.name}'s profile photo`}
                                />
                                <AvatarFallback>
                                    {user.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            {/* Hover Overlay with Edit Button */}
                            <div
                                className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={selectNewPhoto}
                            >
                                <Pencil className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </div>

                    <InputError className="mt-2">{errors.photo}</InputError>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>

                    <Input
                        id="name"
                        className="max-w-lg"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        className="max-w-lg"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>
                </div>
            </form>
        </section>
    );
}
