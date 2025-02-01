<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['category', 'created_by', 'updated_by'];

    public function patients()
    {
        return $this->hasMany(Patient::class);
    }
}
