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
    public function showByGmail($gmail)
    {
        try {
            // Buscar el usuario por su dirección de correo electrónico (gmail)
            $usuarioa = Usuarioa::where('gmail', $gmail)->first();

            if (!$usuarioa) {
                // Si no se encuentra el usuario, devolver una respuesta de error
                return response()->json(['message' => 'Usuario no encontrado'], 404);
            }

            // Devolver el usuario encontrado
            return response()->json($usuarioa, 200);
        } catch (\Exception $e) {
            // Manejar cualquier excepción que ocurra durante la búsqueda del usuario
            return response()->json(['message' => 'Error al buscar el usuario'], 500);
        }
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
