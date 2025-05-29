<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disaster_Response extends Model
{
    use HasFactory;
    protected $fillable =['text','title'];
}
