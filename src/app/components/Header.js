import Link from "next/link";

const Header = () => {
    return (
      <header className="px-6 py-4 border-b dark:border-gray-600 dark:bg-slate-900 dark:text-white">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
                <Link href={"/"}>Medium-clone</Link>
                
                <nav className="flex flex-row items-center gap-4">
                    
                    <Link href="login">
                      <button>
                        Sign in
                      </button>
                    </Link>

                    <Link href="register">
                      <button>
                        Register
                      </button>
                    </Link>
                    
                </nav>
            </div>
      </header>
    );
  }
  
  export default Header