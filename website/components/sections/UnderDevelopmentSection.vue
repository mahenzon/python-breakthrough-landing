<template>
  <section class="py-16 bg-white border-t-4 border-b-4 border-primary-500">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <div class="text-5xl mb-4">🚀</div>
          <h2 class="text-3xl font-bold mb-4">{{ $t('home.underDevelopmentTitle') }}</h2>
          <p class="text-xl text-gray-700 leading-relaxed mb-8">
            {{ $t('home.underDevelopmentText') }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 text-center shadow-lg">
            <div class="text-4xl mb-3">📚</div>
            <h3 class="font-bold text-lg mb-2 text-primary-800">{{ $t('home.underDevelopmentBenefit1') }}</h3>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center shadow-lg">
            <div class="text-4xl mb-3">🎁</div>
            <h3 class="font-bold text-lg mb-2 text-green-800">{{ $t('home.underDevelopmentBenefit2') }}</h3>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center shadow-lg">
            <div class="text-4xl mb-3">♾️</div>
            <h3 class="font-bold text-lg mb-2 text-purple-800">{{ $t('home.underDevelopmentBenefit3') }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
