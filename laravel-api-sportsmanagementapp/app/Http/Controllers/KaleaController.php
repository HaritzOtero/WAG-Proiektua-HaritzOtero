<?php

namespace App\Http\Controllers;
use App\Models\Kalea;
use Illuminate\Http\Request;

class KaleaController extends Controller
{
    public function index()
    {
        return Kalea::all();
    }

    public function store(Request $request)
    {
        $kalea = Kalea::create($request->all());

        return  response()->json($kalea,201);
    }

    public function show(Kalea $kalea)
    {
        return $kalea;
    }
    public function update(Request $request, Kalea $kalea)
    {
        $kalea->update($request->all());
        return response()->json($kalea,200);
    }
    public function delete(Request $request, Kalea $kalea)
{
    $kalea->delete(); // Eliminar la Galdera
    return response()->json(null, 204); // Retornar una respuesta con código 204 (No Content)
}
}
