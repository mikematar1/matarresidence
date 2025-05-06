<?php

namespace App\Models;

use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailSender extends Mailable
{
    use Queueable, SerializesModels;
    protected $user,$subject,$body;
    public function __construct(User $user,$subject,$body)
    {
        $this->user = $user;
        $this->subject = $subject;
        $this->body = $body;
    }
    public function build()
    {
        return $this->view('email', [
            'user' => $this->user,
            'subject'=>$this->subject,
            'body'=>$this->body
        ]);
    }
}
