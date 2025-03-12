<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Action_Scanners extends Model
{
    protected $table = 'action__scanners';

    protected $fillable = [
        'action_id',
        'scanner_id',
    ];

    public function action()
    {
        return $this->belongsTo(Action::class);
    }

    public function scanners()
    {
        return $this->belongsTo(Scanner::class);
    }
}
