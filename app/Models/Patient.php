<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'cin',
        'category_id', 
        'birth_date',
        'gender',
        'phone',
        'created_by',
        'updated_by',
    ];    

    // Relationships
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

