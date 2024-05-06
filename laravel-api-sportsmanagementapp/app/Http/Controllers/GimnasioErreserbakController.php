<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GimnasioErreserbak;
class GimnasioErreserbakController extends Controller
{
    public function index()
    {
        return GimnasioErreserbak::all();
    }

    public function store(Request $request)
    {
        $gimnasioErreserba = GimnasioErreserbak::create($request->all());

        return  response()->json($gimnasioErreserba,201);
    }

    public function show(GimnasioErreserbak $gimnasioErreserba)
    {
        return $gimnasioErreserba;
    }
    public function update(Request $request, GimnasioErreserbak $gimnasioErreserba)
    {
        $gimnasioErreserba->update($request->all());
        return response()->json($gimnasioErreserba,200);
    }
    public function delete(Request $request, GimnasioErreserbak $gimnasioErreserba)
{
    $gimnasioErreserba->delete(); // Eliminar la Galdera
    return response()->json(null, 204); // Retornar una respuesta con código 204 (No Content)
}
}
