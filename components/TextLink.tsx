import { Link, type Href } from "expo-router";
import { Text } from "react-native";

type TextLinkProps = {
  href: Href;
  label: string;
  className?: string;
};

export function TextLink({
  href,
  label,
  className = "",
}: TextLinkProps) {
  return (
    <Link href={href} asChild>
      <Text className={`text-blue-600 text-center ${className}`}>{label}</Text>
    </Link>
  );
}
