<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $table = 'results';
    protected $fillable = [
        'results',
        'action_id',
        'created_by',
        'updated_by',
    ];

    // Relationships
    public function action()
    {
        return $this->belongsTo(Action::class, 'action_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}