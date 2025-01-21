<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'First_Name',
        'Last_Name',
        'CIN',
        'Category',
        'Birth_Date',
        'Gender',
        'Phone',
        'created_by',
        'updated_by',
    ];

    public function actions()
    {
        return $this->hasMany(Action::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
