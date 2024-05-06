<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IgerilekuErreserba;
class IgerilekuErreserbakController extends Controller
{
    public function index()
    {
        return IgerilekuErreserba::all();
    }

    public function store(Request $request)
    {
        $igerilekuErreserba = IgerilekuErreserba::create($request->all());

        return  response()->json($igerilekuErreserba,201);
    }

    public function show(IgerilekuErreserba $igerilekuErreserba)
    {
        return $igerilekuErreserba;
    }
    public function update(Request $request, IgerilekuErreserba $igerilekuErreserba)
    {
        $igerilekuErreserba->update($request->all());
        return response()->json($igerilekuErreserba,200);
    }
    public function delete(Request $request, IgerilekuErreserba $igerilekuErreserba)
{
    $igerilekuErreserba->delete(); // Eliminar la Galdera
    return response()->json(null, 204); // Retornar una respuesta con código 204 (No Content)
}
}
