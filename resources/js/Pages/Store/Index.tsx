import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import { Store, columns } from "./Partials/columns"
import { DataTable } from "./Partials/data-table"
import { PageProps } from '@/types';


export default function StoreIndex( { tiendas }: PageProps<{ tiendas: Store[]  }> ) {

    console.log(tiendas);
    return (
        <AuthenticatedLayout>
            <Head title="Tiendas" />

            <div className="flex flex-1 flex-col gap-4 p-4 sm:p-8 sm:pt-4">
            <div className="container mx-auto py-10">
            <DataTable columns={columns} data={tiendas} />
            </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-primary-foreground aspect-video rounded-xl" />
                    <div className="bg-primary-foreground aspect-video rounded-xl" />
                    <div className="bg-primary-foreground aspect-video rounded-xl" />
                </div>
                <div className="bg-primary-foreground min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
        </AuthenticatedLayout>
    );
}
