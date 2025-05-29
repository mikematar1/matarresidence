<!DOCTYPE html>
<html>
<head>

</head>
<body>
    <p>Hello {{ $user->name }},</p>

    <p>You recently requested to reset your password for your account. Please click the link below to reset your password:</p>

    <p><a href="{{ url('password/reset', $token).'?email='.urlencode($user->email) }}">Reset Password</a></p>

    <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>

    <p>Thank you,<br>Example Company</p>
</body>
</html>
