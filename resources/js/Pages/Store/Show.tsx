import React from 'react'
import { PageProps } from '@/types'
import { Store } from '@/types/store'
import { Head, usePage } from '@inertiajs/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'

const StoreShow = () => {
  const { store } = usePage<PageProps<{ store: Store }>>().props

  return (
    <AuthenticatedLayout>

      <Head title={`Detalles de ${store.name}`} />

      <div className="max-w-4xl mx-auto mt-10 space-y-6 px-4">
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Detalles de la Tienda</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="text-lg font-medium">{store.name}</p>
              </div>

              {/* <div>
                <p className="text-sm text-muted-foreground">Dirección</p>
                <p className="text-lg font-medium">{store.address ?? 'No especificada'}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="text-lg font-medium">{store.phone ?? 'No especificado'}</p>
              </div> */}

              {/* {store.config && (
                <div>
                  <p className="text-sm text-muted-foreground">Configuración</p>
                  <p className="text-lg font-medium">Puntos por compra: {store.config.points_per_dollar}</p>
                </div>
              )} */}
            </div>

            <div className="mt-6">
              {/* <Button variant="secondary" asChild>
                <a href={route('stores.index')}>Volver al listado</a>
              </Button> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}

export default StoreShow
