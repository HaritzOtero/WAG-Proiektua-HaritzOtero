<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioaController;
use App\Http\Controllers\GelaController;
use App\Http\Controllers\IgerilekuErreserbakController;
use App\Http\Controllers\GimnasioErreserbakController;
use App\Http\Controllers\KaleaController;

Route::get('/usuarioas', [UsuarioaController::class, 'index']);
Route::post('/usuarioas', [UsuarioaController::class, 'store']);
Route::get('/usuarioas/{usuarioa}', [UsuarioaController::class, 'show']);
Route::get('/usuarioasGetByGmail/{gmail}', [UsuarioaController::class, 'showByGmail']);
Route::get('/getPasswordByGmail/{gmail}', [UsuarioaController::class, 'getPasswordByGmail']);
Route::put('/usuarioas/{usuarioa}', [UsuarioaController::class, 'update']);
Route::delete('/usuarioas/{usuarioa}', [UsuarioaController::class, 'delete']);

Route::get('/kaleak', [KaleaController::class, 'index']);
Route::post('/kaleak', [KaleaController::class, 'store']);
Route::get('/kaleak/{kalea}', [KaleaController::class, 'show']);
Route::put('/kaleak/{kalea}', [KaleaController::class, 'update']);
Route::delete('/kaleak/{kalea}', [KaleaController::class, 'delete']);

Route::get('/IgerilekuErreserbak', [IgerilekuErreserbakController::class, 'index']);
Route::post('/IgerilekuErreserbak', [IgerilekuErreserbakController::class, 'store']);
Route::get('/IgerilekuErreserbak/{IgerilekuErreserba}', [IgerilekuErreserbakController::class, 'show']);
Route::get('/GetLibreOrduak/{kalea_id}/{eguna}', [IgerilekuErreserbakController::class, 'getOrduakKaleakin']);
Route::get('/GetIgerilekuErreserbakUsuario/{usuario_id}', [IgerilekuErreserbakController::class, 'getIgerilekuErreserbakUsuario']);
Route::get('/GetNireIgerilekuErreserbakUsuario/{usuario_id}', [IgerilekuErreserbakController::class, 'getNireIgerilekuErreserbakUsuario']);
Route::get('/GetIgerilekuErreserbakUsuarioEguneko/{usuario_id}/{eguna}', [IgerilekuErreserbakController::class, 'getIgerilekuErreserbakUsuarioEguneko']);
Route::put('/IgerilekuErreserbak/{IgerilekuErreserba}', [IgerilekuErreserbakController::class, 'update']);
Route::delete('/IgerilekuErreserbak/{IgerilekuErreserba}', [IgerilekuErreserbakController::class, 'delete']);
Route::delete('/IgerrilekuErreserbaZaharrakEzabatu', [IgerilekuErreserbakController::class, 'ezabatuZaharrak']);

Route::get('/GimnasioErreserbak', [GimnasioErreserbakController::class, 'index']);
Route::post('/GimnasioErreserbak', [GimnasioErreserbakController::class, 'store']);
Route::get('/GetGimnasioErreserbakUsuario/{usuario_id}', [GimnasioErreserbakController::class, 'getGimnasioErreserbakUsuario']);
Route::get('/GetNireGimnasioErreserbakUsuario/{usuario_id}', [GimnasioErreserbakController::class, 'getNireGimnasioErreserbakUsuario']);
Route::get('/GetGimnasioErreserbakUsuarioEguneko/{usuario_id}/{eguna}', [GimnasioErreserbakController::class, 'getGimnasioErreserbakUsuarioEguneko']);
Route::get('/GetLibreOrduakGelak/{gela_id}/{eguna}', [GimnasioErreserbakController::class, 'getOrduakGelakin']);
Route::get('/GimnasioErreserbak/{GimnasioErreserba}', [GimnasioErreserbakController::class, 'show']);
Route::get('/GetPertsonaErreserbatutaGelaEgunOrdu/{gela_id}/{eguna}/{ordua}', [GimnasioErreserbakController::class, 'getPertsonaKopuruErreserbatuta']);
Route::put('/GimnasioErreserbak/{GimnasioErreserba}', [GimnasioErreserbakController::class, 'update']);
Route::delete('/GimnasioErreserbak/{GimnasioErreserba}', [GimnasioErreserbakController::class, 'delete']);
Route::delete('/GimnasioErreserbaZaharrakEzabatu', [GimnasioErreserbakController::class, 'ezabatuZaharrakGym']);


Route::get('/gelak', [GelaController::class, 'index']);
Route::post('/gelak', [GelaController::class, 'store']);
Route::get('/gelak/{gela}', [GelaController::class, 'show']);
Route::get('/getPertsonaKopMaxGela/{gelaId}', [GelaController::class, 'getPertsonaKopMaxGela']);
Route::put('/gelak/{gela}', [GelaController::class, 'update']);
Route::delete('/gelak/{gela}', [GelaController::class, 'delete']);