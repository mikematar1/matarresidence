<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $fillable = ['title','description','rent', 'size','guests','floor','beds','wifi','tv','shower','towels','mini_bar','desk','featured','discount'];
}
