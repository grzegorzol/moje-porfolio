import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export default function TestDatabase() {
  const [results, setResults] = useState<Record<string, TestResult>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    setLoading(true);
    const testResults: Record<string, TestResult> = {};

    // Test 1: Połączenie z bazą
    try {
      const { data, error } = await supabase.from('user_roles').select('count');
      testResults['connection'] = {
        success: !error,
        message: 'Połączenie z bazą danych',
        data: data,
        error: error?.message,
      };
    } catch (err: any) {
      testResults['connection'] = {
        success: false,
        message: 'Połączenie z bazą danych',
        error: err.message,
      };
    }

    // Test 2: Odczyt ustawień strony
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(5);
      testResults['site_settings'] = {
        success: !error,
        message: 'Odczyt ustawień strony',
        data: data,
        error: error?.message,
      };
    } catch (err: any) {
      testResults['site_settings'] = {
        success: false,
        message: 'Odczyt ustawień strony',
        error: err.message,
      };
    }

    // Test 3: Odczyt projektów
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .limit(5);
      testResults['projects'] = {
        success: !error,
        message: 'Odczyt projektów',
        data: data,
        error: error?.message,
      };
    } catch (err: any) {
      testResults['projects'] = {
        success: false,
        message: 'Odczyt projektów',
        error: err.message,
      };
    }

    // Test 4: Odczyt ról użytkowników
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .limit(5);
      testResults['user_roles'] = {
        success: !error,
        message: 'Odczyt ról użytkowników',
        data: data,
        error: error?.message,
      };
    } catch (err: any) {
      testResults['user_roles'] = {
        success: false,
        message: 'Odczyt ról użytkowników',
        error: err.message,
      };
    }

    // Test 5: Sprawdź czy użytkownik jest zalogowany
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      testResults['auth'] = {
        success: !error,
        message: 'Status autoryzacji',
        data: user ? { email: user.email, id: user.id } : null,
        error: error?.message,
      };
    } catch (err: any) {
      testResults['auth'] = {
        success: false,
        message: 'Status autoryzacji',
        error: err.message,
      };
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            🧪 Test Połączenia z Supabase
          </h1>

          <div className="mb-6">
            <p className="text-gray-600">
              Project ID: <code className="bg-gray-100 px-2 py-1 rounded">wfppsbcdjelootoltvrd</code>
            </p>
            <p className="text-gray-600">
              URL: <code className="bg-gray-100 px-2 py-1 rounded">
                https://wfppsbcdjelootoltvrd.supabase.co
              </code>
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-gray-600">Testowanie połączenia...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(results).map(([key, result]) => (
                <div
                  key={key}
                  className={`p-4 rounded-lg border-2 ${
                    result.success
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        {result.success ? (
                          <span className="text-green-600 mr-2">✅</span>
                        ) : (
                          <span className="text-red-600 mr-2">❌</span>
                        )}
                        {result.message}
                      </h3>

                      {result.success && result.data && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            {Array.isArray(result.data)
                              ? `Znaleziono ${result.data.length} rekordów`
                              : 'Dane dostępne'}
                          </p>
                          <details className="mt-2">
                            <summary className="text-sm text-blue-600 cursor-pointer hover:underline">
                              Pokaż dane
                            </summary>
                            <pre className="mt-2 p-3 bg-gray-800 text-green-400 rounded text-xs overflow-auto max-h-48">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          </details>
                        </div>
                      )}

                      {result.error && (
                        <p className="mt-2 text-sm text-red-600">
                          <strong>Błąd:</strong> {result.error}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={runTests}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                🔄 Uruchom ponownie testy
              </button>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">📝 Następne kroki:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
              <li>Dodaj pierwszego admina używając <code>add-admin-user.sql</code></li>
              <li>Dodaj przykładowe dane do tabel (opcjonalnie)</li>
              <li>Przetestuj upload do storage bucket 'media'</li>
              <li>Sprawdź polityki RLS dla różnych użytkowników</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
