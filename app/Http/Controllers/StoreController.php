<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    /**
     * Display a listing of the stores.
     */
    public function index(): Response
    {
        // $stores = Store::with('config')->get();
        $stores = Store::get();

        return Inertia::render('Store/Show', [
            'stores' => $stores,
        ]);
    }

    /**
     * Show the form for creating a new store.
     */
    public function create(): Response
    {
        return Inertia::render('Store/Create');
    }

    /**
     * Store a newly created store in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string'],
        ]);

        Store::create($validated);

        return Redirect::route('stores.index')->with('success', 'Tienda creada exitosamente.');
    }

    /**
     * Display the specified store.
     */
    public function show(Store $store): Response
    {
        return Inertia::render('Store/Show', [
            // 'store' => $store->load('config'),
            'store' => $store,
        ]);
    }

    /**
     * Show the form for editing the specified store.
     */
    public function edit(Store $store): Response
    {
        return Inertia::render('Store/Edit', [
            'store' => $store,
        ]);
    }

    /**
     * Update the specified store in storage.
     */
    public function update(Request $request, Store $store)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            // 'address' => ['nullable', 'string'],
            // 'phone' => ['nullable', 'string'],
        ]);

        $store->update($validated);

        return Redirect::route('stores.index')->with('success', 'Tienda actualizada exitosamente.');
    }

    /**
     * Remove the specified store from storage.
     */
    public function destroy(Store $store)
    {
        $store->delete();

        return Redirect::route('stores.index')->with('success', 'Tienda eliminada.');
    }
}
