<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordRenewal extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $user,$token;
    public function __construct($user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    public function envelope()
    {
        return new Envelope(
            subject: 'Password Renewal'
        );
    }

    /**
     * Get the message content definition.
     */
    public function content()
    {
        return $this->view('password-renewal')->with([
            'user' => $this->user,
            'token' => $this->token
        ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
