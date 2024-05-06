<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gela;

class GelaController extends Controller
{
    public function index()
    {
        return Gela::all();
    }

    public function store(Request $request)
    {
        $gela = Gela::create($request->all());

        return  response()->json($gela,201);
    }

    public function show(Gela $gela)
    {
        return $gela;
    }
    public function update(Request $request, Gela $gela)
    {
        $gela->update($request->all());
        return response()->json($gela,200);
    }
    public function delete(Request $request, Gela $gela)
{
    $gela->delete(); // Eliminar la Galdera
    return response()->json(null, 204); // Retornar una respuesta con código 204 (No Content)
}
}
