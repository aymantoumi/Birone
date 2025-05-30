<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{

    protected $table = 'notes';
    
    protected $fillable = [
        'note',
        'action_id',
    ];

    public function action()
    {
        return $this->belongsTo(Action::class, 'action_id');
    }
}