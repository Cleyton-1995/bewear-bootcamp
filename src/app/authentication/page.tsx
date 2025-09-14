import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = async () => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-6 md:px-4">
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7 lg:col-span-6">
            <Tabs defaultValue="sign-in" className="w-full">
              <TabsList className="w-full justify-start rounded-2xl">
                <TabsTrigger value="sign-in" className="rounded-xl px-4">
                  Entrar
                </TabsTrigger>
                <TabsTrigger value="sign-up" className="rounded-xl px-4">
                  Criar conta
                </TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="sign-in" className="w-full">
                  <div className="mx-auto max-w-md md:max-w-lg">
                    <SignInForm />
                  </div>
                </TabsContent>

                <TabsContent value="sign-up" className="w-full">
                  <div className="mx-auto max-w-md md:max-w-lg">
                    <SignUpForm />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="hidden md:col-span-5 md:block lg:col-span-6">
            <div className="relative h-full min-h-[360px] w-full overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#7459ED_0%,#D4D7E4_100%)] p-8">
              <div className="max-w-md">
                <h2 className="text-2xl leading-tight font-semibold text-white">
                  Descubra a nova experiência BEWEAR
                </h2>
                <p className="mt-2 text-sm text-gray-200">
                  Crie sua conta e tenha acesso a benefícios exclusivos,
                  pensados para deixar sua jornada de compras ainda mais prática
                  e inspiradora.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-gray-100">
                  <li>• Finalize suas compras em poucos cliques</li>
                  <li>• Consulte pedidos anteriores com facilidade</li>
                  <li>• Receba ofertas exclusivas e novidades</li>
                </ul>
              </div>

              <div className="pointer-events-none absolute top-[-20%] right-[-20%] aspect-square w-[70%] rounded-full bg-white/40 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
