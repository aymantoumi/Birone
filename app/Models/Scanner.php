<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scanner extends Model
{
    protected $table = 'scanners';
    
    protected $fillable = [
        'scan'
    ];

    public function actions()
    {
        return $this->belongsToMany(Action::class, 'action__scanners', 'scanner_id', 'action_id');
    }
}