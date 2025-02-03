<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\ActionsTypeController;
use App\Http\Controllers\categories;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Settings;
use App\Http\Controllers\StatisticsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'Index'])->name('dashboard');
    Route::resource('Patients', PatientController::class);
    Route::resource('categories', categories::class);
    Route::resource('patients.actions', ActionController::class)->shallow();
    Route::put('actions/{action}', [ActionController::class, 'update'])->name('actions.update');
    Route::post('/patients/{patient}/change-status', [ActionController::class, 'changeStatus'])->name('action.changeStatus');
    Route::resource('Statistics', StatisticsController::class);
    Route::resource('actionType', ActionsTypeController::class);
    Route::get('/settings', [Settings::class, 'index'])->name('settings.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
