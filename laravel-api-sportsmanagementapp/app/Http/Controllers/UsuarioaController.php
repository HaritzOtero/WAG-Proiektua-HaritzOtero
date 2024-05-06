<?php

namespace App\Http\Controllers;
use App\Models\Usuarioa;
use Illuminate\Http\Request;

class UsuarioaController extends Controller
{
    public function index()
    {
        return Usuarioa::all();
    }

    public function store(Request $request)
    {
        $usuarioa = Usuarioa::create($request->all());

        return  response()->json($usuarioa,201);
    }

    public function show(Usuarioa $usuarioa)
    {
        return $usuarioa;
    }
    public function update(Request $request, Usuarioa $usuarioa)
    {
        $usuarioa->update($request->all());
        return response()->json($usuarioa,200);
    }
    public function delete(Request $request, Usuarioa $usuarioa)
{
    $usuarioa->delete(); // Eliminar la Galdera
    return response()->json(null, 204); // Retornar una respuesta con código 204 (No Content)
}
}
