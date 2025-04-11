<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\ActionsTypeController;
use App\Http\Controllers\categories;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LabResultController;
use App\Http\Controllers\MedicationClassController;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScannerController;
use App\Http\Controllers\Settings;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\CheckupController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified', 'administrator:admin'])->group(function () {
    Route::resource('categories', categories::class);
    Route::put('actions/{action}', [ActionController::class, 'update'])->name('actions.update');
    Route::resource('Statistics', StatisticsController::class);
    Route::resource('actionType', ActionsTypeController::class);
    Route::get('/settings', [Settings::class, 'index'])->name('settings.index');
    Route::resource('usersManagement', UsersController::class);
    Route::resource('medicationClass', MedicationClassController::class);
    Route::resource('lab_results', LabResultController::class);
    Route::resource('scans', ScannerController::class);
    Route::resource('medications', MedicationController::class);
    Route::post('/Patients/{patient}', [CheckupController::class, 'store'])->name('patients.checkup');
    Route::put('/checkups/{actionId}', [CheckupController::class, 'update'])->name('checkups.update');
});

Route::middleware(['auth', 'verified',])->group(function () {
    Route::get('/dashboard', [HomeController::class, 'Index'])->name('dashboard');
    Route::resource('Patients', PatientController::class);
    Route::resource('patients.actions', ActionController::class)->shallow();
    Route::post('/patients/{patient}/change-status', [ActionController::class, 'changeStatus'])->name('action.changeStatus');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
