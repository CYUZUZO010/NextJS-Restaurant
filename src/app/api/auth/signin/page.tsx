
"use client" //for the rendering on client side

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
  const router = useRouter()

  const handleSignIn = () => {
    
    router.push("/admin")
  }

  const handleGoHome = () => {
    router.push("/")
  }

  //sign up page
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-100 to-amber-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In Required</CardTitle>
          <CardDescription>
            You need to sign in to access the admin area.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleSignIn} className="w-full bg-stone-700 hover:bg-stone-800">
            Mock Sign In (Go to Admin)
          </Button>
          <Button onClick={handleGoHome} variant="outline" className="w-full">
            Go Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
